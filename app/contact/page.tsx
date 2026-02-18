"use client";
import { sendContactMessage } from "@/actions/user-action";
import Button from "@/app/_components/ui/Button/Button";
import Form from "@/app/_components/ui/Form/Form";
import toast from "react-hot-toast";

export default function ContactPage() {
  async function handleSubmit(formData: FormData) {
    await toast.promise(sendContactMessage(formData), {
      loading: "Enviando...",
      success: (data) => data.message,
      error: (err) => err.message,
    });
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto max-w-lg space-y-6">
        <h1 className="text-3xl font-semibold">Fale conosco</h1>

        <Form action={handleSubmit} className="space-y-4">
          <Form.Input name="name" placeholder="Seu nome" />
          <Form.Input name="email" type="email" placeholder="Seu email" />
          <textarea
            name="message"
            placeholder="Sua mensagem"
            className="w-full border p-3 rounded-lg"
          />

          <Button variant="primary" size="lg" pendingLabel="sending...">
            Enviar mensagem
          </Button>
        </Form>
      </div>
    </div>
  );
}
