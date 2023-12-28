<script lang="ts">
  let questionsShown: boolean[] = [];
  let questions = [
    {
      question: "Can I refund my tickets?",
      answer:
        "If you have purchased your tickets with your My Cinemika account, you can cancel your tickets up to half an hour before the start of the film under BOOKINGS in your account. Tickets purchased at the box office can only be cancelled at the box office, please arrive at the cinema at least 30 minutes before the film starts.",
    },
    {
      question: "How can I change my password?",
      answer:
        "To change your password, go to your account settings and select the 'Change Password' option. Follow the instructions to set a new password for your account.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, including Visa, Mastercard, and American Express. We also support payment through popular digital wallets such as Apple Pay and Google Pay.",
    },
    {
      question: "How can I change the cinema's location?",
      answer:
        "To change the cinema's location, go to the <a href='/locations' class='text-buttonBlue hover:text-blue-500 duration-300'>locations page</a> under the user icon in the navbar and select the cinema you want to visit.",
    },
  ];
  for (let i = 0; i < questions.length; i++) {
    questionsShown.push(false);
  }
</script>

<svelte:head>
  <title>Cinemika - Help</title>
</svelte:head>
<div class="container mx-auto py-12 px-4 md:px-0 text-textWhite">
  <h1 class="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
  <div class="space-y-6">
    {#each questions as question, index}
      <div class="border rounded-lg px-6 py-4 bg-tileBlue justify-between">
        <div class="flex flex-row justify-between">
          <h2 class="text-2xl font-semibold mb-2 justify-start">
            {question.question}
          </h2>
          <button
            on:click={() => {
              for (let i = 0; i < questionsShown.length; i++) {
                if (i !== index) {
                  questionsShown[i] = false;
                }
              }
              questionsShown[index] = !questionsShown[index];
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 my-auto justify-end duration-300"
              class:rotate-180={questionsShown[index]}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
        <p class:hidden={!questionsShown[index]} class="duration-300">
          {@html question.answer}
        </p>
      </div>
    {/each}
  </div>
</div>
