import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SignInRoute } from "./routes/sign-in/sign-in.route.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<SignInRoute />
	</StrictMode>,
);
