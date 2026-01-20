function Form({ children, className = "", ...props }) {
  return (
    <form className={`flex flex-col gap-10 ${className}`} {...props}>
      {children}
    </form>
  );
}

Form.Field = function Field({ children }) {
  return <div className="flex flex-col gap-2">{children}</div>;
};

Form.Label = function Label({ children }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
      {children}
    </label>
  );
};

Form.Input = function Input({ className = "", ...props }) {
  return (
    <input
      className={`border-b border-gray-300 bg-transparent px-1 py-2
                  text-base text-black
                  focus:border-black focus:outline-none ${className}`}
      {...props}
    />
  );
};

Form.Actions = function Actions({ children }) {
  return <div className="pt-6">{children}</div>;
};

export default Form;
