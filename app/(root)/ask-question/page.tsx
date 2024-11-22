import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Question | Stack Overflow",
};

const AskQuestion = async () => {
  const { userId } = auth();

  if (!userId) {
    console.error("User is not authenticated");
    redirect("/sign-in");
    return null;
  }

  const mongoUser = await getUserById({ userId });

  if (!mongoUser) {
    console.error("User not found for userId:", userId);
    return <p>User not found. Please sign in again.</p>;
  }

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};


export default AskQuestion;
