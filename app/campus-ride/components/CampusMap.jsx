"use client";

import { useEffect, useRef } from "react";
import { LocateFixed, Minus, Navigation, Plus } from "lucide-react";
import { useCampusRide } from "@/lib/campus-ride/CampusRideContext";

function getLocationMessage(status, error) {
  if (status === "loading") return "Finding your location...";
  return error || "Allow location access to see your position on the ride map.";
}

function isValidLocation(location) {
  return (
    location &&
    Number.isFinite(location.latitude) &&
    Number.isFinite(location.longitude)
  );
}

function createUserIcon(L, heading, scale = 1) {
  const rotation = Number.isFinite(heading) && heading >= 0 ? heading : 0;

  return L.divIcon({
    className: "campus-user-icon",
    html: `<span class="campus-user-marker" aria-hidden="true" style="transform: scale(${scale})"><span class="campus-user-marker__arrow" style="transform: rotate(${rotation}deg)"></span><span class="campus-user-marker__dot"></span></span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

export default function CampusMap() {
  const mapElementRef = useRef(null);
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const markerRef = useRef(null);
  const accuracyCircleRef = useRef(null);
  const hasCenteredRef = useRef(false);
  const followUserRef = useRef(true);
  const animationFrameRef = useRef(null);
  const markerScaleRef = useRef(1);
  const headingRef = useRef(null);
  const {
    userLocation,
    locationStatus,
    locationError,
    startLocationTracking,
    stopLocationTracking,
  } = useCampusRide();

  useEffect(() => {
    headingRef.current = userLocation?.heading ?? null;
  }, [userLocation?.heading]);

  useEffect(() => {
    startLocationTracking();
    return stopLocationTracking;
  }, [startLocationTracking, stopLocationTracking]);

  useEffect(() => {
    if (!isValidLocation(userLocation) || mapRef.current || !mapElementRef.current) {
      return undefined;
    }

    let cancelled = false;

    import("leaflet").then(({ default: L }) => {
      if (cancelled || !mapElementRef.current) return;

      const { latitude, longitude, accuracy, heading } = userLocation;
      const map = L.map(mapElementRef.current, { zoomControl: false }).setView(
        [latitude, longitude],
        16,
      );

      map.on("dragstart", () => {
        followUserRef.current = false;
      });

      map.on("zoomend", () => {
        markerScaleRef.current = Math.max(
          0.78,
          Math.min(1.08, 1 - (map.getZoom() - 16) * 0.05),
        );
        markerRef.current?.setIcon(
          createUserIcon(L, headingRef.current, markerScaleRef.current),
        );
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      markerRef.current = L.marker([latitude, longitude], {
        icon: createUserIcon(L, heading, markerScaleRef.current),
        title: "Your location",
        zIndexOffset: 1000,
      }).addTo(map);

      accuracyCircleRef.current = L.circle([latitude, longitude], {
        radius: Math.max(accuracy || 0, 1),
        color: "#2563eb",
        fillColor: "#60a5fa",
        fillOpacity: 0.16,
        weight: 1,
      }).addTo(map);

      leafletRef.current = L;
      mapRef.current = map;
      hasCenteredRef.current = true;
    });

    return () => {
      cancelled = true;
    };
  }, [userLocation]);

  useEffect(() => {
    if (!isValidLocation(userLocation) || !mapRef.current || !markerRef.current) return;

    const { latitude, longitude, accuracy, heading } = userLocation;
    const current = markerRef.current.getLatLng();
    const startedAt = performance.now();
    const duration = 650;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const animateMarker = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const nextLatitude = current.lat + (latitude - current.lat) * eased;
      const nextLongitude = current.lng + (longitude - current.lng) * eased;

      markerRef.current?.setLatLng([nextLatitude, nextLongitude]);
      accuracyCircleRef.current?.setLatLng([nextLatitude, nextLongitude]);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateMarker);
      } else {
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateMarker);
    markerRef.current.setIcon(
      createUserIcon(leafletRef.current, heading, markerScaleRef.current),
    );
    accuracyCircleRef.current?.setRadius(Math.max(accuracy || 0, 1));

    if (!hasCenteredRef.current) {
      mapRef.current.setView([latitude, longitude], 16);
      hasCenteredRef.current = true;
    } else if (followUserRef.current) {
      mapRef.current.panTo([latitude, longitude], {
        animate: true,
        duration: 0.65,
      });
    }
  }, [userLocation]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
      accuracyCircleRef.current = null;
      leafletRef.current = null;
    };
  }, []);

  function recenterMap() {
    startOrientationTracking();
    if (isValidLocation(userLocation) && mapRef.current) {
      followUserRef.current = true;
      mapRef.current.setView([userLocation.latitude, userLocation.longitude], 16, {
        animate: true,
      });
    } else {
      startLocationTracking();
    }
  }

  const showLocationMessage = locationStatus !== "granted" || !isValidLocation(userLocation);

  return (
    <div className="relative h-[360px] min-h-[360px] w-full overflow-hidden rounded-xl border border-line bg-[#e8e6df] lg:h-full">
      <div ref={mapElementRef} className="absolute inset-0 z-0" />

      {showLocationMessage && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-paper/85 p-6 text-center backdrop-blur-[2px]">
          <div className="max-w-xs">
            <LocateFixed className="mx-auto mb-3 text-bronze-deep" size={28} />
            <p className="font-semibold text-charcoal">
              {getLocationMessage(locationStatus, locationError)}
            </p>
            {locationStatus !== "loading" && (
              <button
                type="button"
                onClick={startLocationTracking}
                className="mt-4 rounded-lg bg-charcoal px-4 py-2 text-sm font-semibold text-cream hover:bg-charcoal/90"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      )}

      <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => mapRef.current?.zoomIn()}
          aria-label="Zoom in"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-charcoal shadow-sm hover:bg-paper"
        >
          <Plus size={16} />
        </button>
        <button
          type="button"
          onClick={() => mapRef.current?.zoomOut()}
          aria-label="Zoom out"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-charcoal shadow-sm hover:bg-paper"
        >
          <Minus size={16} />
        </button>
        <button
          type="button"
          onClick={recenterMap}
          aria-label="Recenter on my location"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-bronze-deep shadow-sm hover:bg-paper"
        >
          <Navigation size={16} />
        </button>
      </div>
    </div>
  );
}
