import { AuthDialog } from "@/components/auth/AuthDialog";

const SignIn = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <AuthDialog initialMode="signin" />
    </div>
  );
};

export default SignIn;