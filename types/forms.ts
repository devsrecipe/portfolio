export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  /** What the user typed, returned on failure so the form can refill itself. */
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };
