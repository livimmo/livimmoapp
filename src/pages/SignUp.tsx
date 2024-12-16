import { AuthDialog } from "@/components/auth/AuthDialog";

const SignUp = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <AuthDialog initialMode="signup" />
    </div>
  );
};

export default SignUp;