import { useState } from "react";

export const useFormSubmit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const checkFormData = (): boolean => {
    return Object.values(formData).every(value => value !== "");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!checkFormData()) {
      setIsLoading(false);
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        setError("Failed to submit form");
        throw new Error("Failed to submit form");
      }
      const data = await res.json();
      console.log(data);
      // reset form
      setFormData({ name: "", email: "", message: "" });
      setError(null);
    } catch (err) {
      err instanceof Error && setError(err.message || "Failed to submit form");
    } finally {
      setIsLoading(false);
    }
  }

  return { formData, isLoading, errorForm: error, handleChange, handleSubmit, checkFormData };
}
