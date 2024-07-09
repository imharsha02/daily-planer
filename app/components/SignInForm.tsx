import SignInFormComponent from "@/app/components/SingInFormComponent"
import { TypographyH2 } from "@/components/ui/TypographyH2";
import { TypographyP } from "@/components/ui/TypographyP";
const SignInForm = () => {
    return (
        <div className="grid grid-cols-2">
          {/* About the app */}
          <div>
            <TypographyH2 className="border-none text-center">
              Plan your day
            </TypographyH2>
            <div className="max-w-lg mx-auto">
              <TypographyP className="text-center">
                Plan your day. Just fill the form with the details of
                your task for the day and download the generated table.
                <br /> Sign in to continue
              </TypographyP>
            </div>
          </div>
          <SignInFormComponent />
        </div>
      );
}

export default SignInForm
