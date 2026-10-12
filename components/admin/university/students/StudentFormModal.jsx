"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import AdminButton from "@/components/admin/shared/AdminButton";
import { useToast } from "@/components/ui/Toast";
import { createStudent, PROGRAMMES, UG_LEVELS, PG_LEVELS } from "@/lib/services/admin/studentsService";

const PROGRAMME_OPTIONS = [{ value: "", label: "Select programme" }, ...PROGRAMMES.map((p) => ({ value: p.id, label: p.name }))];

const levelOptionsFor = (prog) =>
  !prog
    ? [{ value: "", label: "Select a programme first" }]
    : prog.type === "undergraduate"
    ? UG_LEVELS.map((l) => ({ value: String(l), label: `Level ${l}` }))
    : PG_LEVELS.map((l) => ({ value: l, label: l }));

/** Render conditionally ({open && <StudentFormModal/>}) so the form resets on each open. */
export default function StudentFormModal({ onClose, onCreated }) {
  const toast = useToast();
  const [form, setForm] = useState({ fullName: "", email: "", matric: "", programmeId: "", level: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const prog = PROGRAMMES.find((p) => p.id === form.programmeId);
  const set = (patch) => {
    setForm((f) => ({ ...f, ...patch }));
    setErrors((e) => {
      const n = { ...e };
      Object.keys(patch).forEach((k) => delete n[k]);
      delete n.form;
      return n;
    });
  };
  const onProgramme = (id) => {
    const p = PROGRAMMES.find((x) => x.id === id);
    set({ programmeId: id, level: p ? levelOptionsFor(p)[0].value : "" });
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    try {
      const { student } = await createStudent({ ...form, matric: form.matric.trim().toUpperCase() });
      toast.push({ title: "Student added", message: `${student.fullName} (${student.matric}). Saved to sample data only.` });
      onCreated?.(student);
      onClose();
    } catch (err) {
      setErrors(err.fields && Object.keys(err.fields).length ? err.fields : { form: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open
      onClose={busy ? undefined : onClose}
      title="Add New Student"
      subtitle="Create a student account in this university."
      footer={
        <>
          <AdminButton onClick={onClose} disabled={busy}>Cancel</AdminButton>
          <AdminButton variant="primary" type="submit" form="student-form" loading={busy}>Add student</AdminButton>
        </>
      }
    >
      <form id="student-form" onSubmit={submit} noValidate className="space-y-5">
        {errors.form && <p role="alert" className="rounded-lg bg-[#fef2f2] px-3 py-2 text-[13px] text-[#991b1b]">{errors.form}</p>}
        <Input label="Full name" value={form.fullName} onChange={(e) => set({ fullName: e.target.value })} placeholder="e.g. Zainab Usman" error={errors.fullName} autoFocus />
        <Input label="Email address" type="email" value={form.email} onChange={(e) => set({ email: e.target.value })} placeholder="z.usman@buk.edu.ng" error={errors.email} />
        <Input label="Matriculation number" mono value={form.matric} onChange={(e) => set({ matric: e.target.value.toUpperCase() })} placeholder="21/CSC/042" error={errors.matric} hint="Format: YY/DEPT/NNN" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Select label="Programme" options={PROGRAMME_OPTIONS} value={form.programmeId} onChange={(e) => onProgramme(e.target.value)} error={errors.programmeId} />
          <Select label="Level" options={levelOptionsFor(prog)} value={form.level} onChange={(e) => set({ level: e.target.value })} error={errors.level} disabled={!prog} />
        </div>
      </form>
    </Modal>
  );
}