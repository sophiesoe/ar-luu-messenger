"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";

import Input from "@/app/commons/inputs/Input";
import Button from "@/app/commons/buttons/Button";
import AuthSocialButton from "@/app/commons/buttons/AuthSocialButton";
import axios from "axios";
import { useRouter } from "next/navigation";

function AuthForm() {
  type Variant = "LOGIN" | "REGISTER";
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") setVariant("REGISTER");
    else setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          signIn("credentials", data);
          toast.success("Welcome to Ar Luu!", {
            icon: "🥔",
            style: {
              background: "#FDFAD9",
              color: "#4699C3",
            },
          });
        })
        .catch(() => {
          toast.error("Something went wrong!", {
            icon: "🥺",
            style: {
              background: "#FDFAD9",
              color: "#D04539",
            },
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((cb) => {
          if (cb?.error) {
            toast.error("You're not an Ar Luu yet!", {
              icon: "🤯",
              style: {
                background: "#FDFAD9",
                color: "#4699C3",
              },
            });
          }
          if (cb?.ok && !cb?.error) {
            toast.success("Welcome to Ar Luu!", {
              icon: "🥔",
              style: {
                background: "#FDFAD9",
                color: "#4699C3",
              },
            });
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialActions = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((cb) => {
        if (cb?.error) {
          toast.error("You're not an Ar Luu yet!", {
            icon: "🤯",
            style: {
              background: "#FDFAD9",
              color: "#4699C3",
            },
          });
        }
        if (cb?.ok && !cb?.error) {
          toast.error("Welcome to Ar Luu!", {
            icon: "🥔",
            style: {
              background: "#FDFAD9",
              color: "#4699C3",
            },
          });
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 w-full @lg:mx-auto md:w-4/6 lg:mt-0">
      <div className="rounded-lg bg-warning-50 px-10 py-8 shadow @sm:w-full @md:px-8">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              type="text"
              placeholder="Enter your name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            placeholder="Enter your email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button fullWidth disabled={isLoading} type="submit">
              {variant === "LOGIN" ? "Sign in" : "Sign up"}
            </Button>
          </div>
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary-50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-warning-50 px-2 text-black">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => socialActions("github")}
              />
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => socialActions("google")}
              />
            </div>
            <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-black">
              <div>
                {variant === "LOGIN"
                  ? "New to Ar Luu ?"
                  : "Already have an account?"}
              </div>
              <div
                className="cursor-pointer text-primary-300 underline"
                onClick={toggleVariant}
              >
                {variant === "LOGIN" ? "Create an account" : "Log in"}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
