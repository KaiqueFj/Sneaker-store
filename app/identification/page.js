export default function Page() {
  return (
    <div className="mx-auto max-w-3xl p-8 flex flex-col gap-10">
      {/* IDENTIFICATION */}
      <section className="border-b pb-6">
        <h1 className="text-3xl font-semibold mb-6">Identification</h1>

        <h2 className="text-xl font-medium mb-4">Personal information</h2>

        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="font-medium">Kaique Ferraz de Jesus</p>
          </div>

          <div>
            <p className="text-gray-500">CPF</p>
            <p className="font-medium">***.***.***-30</p>
          </div>

          <div>
            <p className="text-gray-500">E-mail</p>
            <p className="font-medium">kaiquelferraz@teste.com.br</p>
          </div>
        </div>
      </section>

      {/* SHIPPING ADDRESS */}
      <section className="border-b pb-6">
        <h2 className="text-2xl font-medium mb-4">Shipping address</h2>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="radio" name="address" className="mt-1" defaultChecked />

          <div className="flex flex-col gap-1">
            <p className="font-medium">Default address</p>
            <p className="text-sm text-gray-600">Rua Dr. João Pessoa, nº 10</p>

            <button
              type="button"
              className="text-sm text-primary-600 underline w-fit"
            >
              Edit address
            </button>
          </div>
        </label>

        <button
          type="button"
          className="mt-4 text-sm font-medium text-primary-600"
        >
          + Add new address
        </button>
      </section>

      {/* SHIPPING METHOD */}
      <section>
        <h2 className="text-2xl font-medium mb-4">Shipping method</h2>

        <div className="flex flex-col gap-4">
          <label className="flex items-start gap-3 cursor-pointer border rounded-lg p-4">
            <input
              type="radio"
              name="shippingMethod"
              defaultChecked
              className="mt-1"
            />

            <div>
              <p className="font-medium">Standard — Free</p>
              <p className="text-sm text-gray-600">3 business days</p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer border rounded-lg p-4">
            <input type="radio" name="shippingMethod" className="mt-1" />

            <div>
              <p className="font-medium">Express — $10</p>
              <p className="text-sm text-gray-600">2 business days</p>
            </div>
          </label>
        </div>
      </section>
    </div>
  );
}
