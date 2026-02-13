function Form({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <form className={`flex flex-col gap-6 ${className}`} {...props}>
      {children}
    </form>
  );
}

Form.Field = function Field({ children }) {
  return <div className="flex flex-col gap-3">{children}</div>;
};

Form.Label = function Label({ children }) {
  return (
    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
      {children}
    </label>
  );
};

Form.InputWrapper = function InputWrapper({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`relative ${className}`}>{children}</div>;
};

Form.Input = function Input({
  className = "",
  ...props
}: {
  className?: string;
}) {
  return (
    <input
      className={`
        w-full bg-transparent
        border-b border-neutral-300
        px-1 py-2.5
        text-base text-neutral-900
        placeholder:text-neutral-400

        transition-colors duration-200
        focus:border-primary-600
        focus:outline-none

        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    />
  );
};

Form.Actions = function Actions({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`pt-4 ${className}`}>{children}</div>;
};

export default Form;
