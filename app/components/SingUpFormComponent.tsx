import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "../../components/ui/form";
import { Input } from "@/components/ui/input";
import { hashPassword } from "@/app/lib/utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/app/lib/supabase";
const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be unique.",
    })
    .max(50),
  password: z.string().min(8, {
    message: "Password must be at lest 8 characters long",
  }),
});
const SignupFormComponent = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values);
  // }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const hashedPassword = await hashPassword(values.password);
      await supabase.from("new_users").insert({
        unique_username: values.username,
        password: hashedPassword,
      });
      router.push("/Home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Card className="mx-auto w-max">
        <CardHeader>
          <CardTitle className="text-center">Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>Enter a unique username.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter a password for your account
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupFormComponent;
