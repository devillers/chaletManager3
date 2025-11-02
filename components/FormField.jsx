"use client";

export function TextField({ id, label, type = "text", value, onChange, required, ...props }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1 text-sm text-neutral-700">
      <span className="font-medium text-neutral-800">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        className="rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none"
        {...props}
      />
    </label>
  );
}

export function SelectField({ id, label, value, onChange, children, required, ...props }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1 text-sm text-neutral-700">
      <span className="font-medium text-neutral-800">{label}</span>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none"
        {...props}
      >
        {children}
      </select>
    </label>
  );
}

export function CheckboxField({ id, label, checked, onChange, required, ...props }) {
  return (
    <label htmlFor={id} className="flex items-start gap-2 text-sm text-neutral-700">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        className="mt-1 h-4 w-4 rounded border-neutral-300"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
