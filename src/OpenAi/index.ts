import OpenAI from "openai";

export default async function () {
  const openai = new OpenAI({
    apiKey: "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",
  });

  // const completion = openai.chat.completions.create({
  //   model: "gpt-4o-mini",
  //   messages: [
  //     { role: "system", content: "You are a helpful assistant." },
  //     {
  //       role: "user",
  //       content: "Write a haiku about recursion in programming.",
  //     },
  //   ],
  // });

  // return completion.then((result) => console.log(result.choices[0].message));

  // import OpenAI from "openai";
  // const openai = new OpenAI();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "Write a haiku about recursion in programming.",
      },
    ],
  });

  console.log(completion.choices[0].message);
}
