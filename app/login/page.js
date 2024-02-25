"use client";

import { useFormState } from "react-dom";
import { login } from "./action";

export default async function Page() {
    const initialState = {
        message: null,
    };

    const [state, formAction] = useFormState(login, initialState);

    return (
        <div>
            <form action={formAction}>
                <div>
                    Email <input className="border-2" name="email" />
                </div>
                <div>
                    Password <input className="border-2" name="password" type="password" />
                </div>
                <button className="bg-blue-500 p-3">Login</button>
                <div>Message: {state?.message}</div>
            </form>
        </div>
    );
}
