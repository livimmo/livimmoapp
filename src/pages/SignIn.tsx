import { AuthDialog } from "@/components/auth/AuthDialog";

const SignIn = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <AuthDialog mode="signin" />
    </div>
  );
};

export default SignIn;