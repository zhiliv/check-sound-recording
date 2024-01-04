<template>
  <div class="spinner" />
</template>

<style>
  .spinner {
    color: #fbbf24;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
  }

  .spinner:after {
    animation: changeContent 0.8s linear infinite;
    display: block;
    content: "⠋";
    font-size: 35px;
  }

  @keyframes changeContent {
    10% {
      content: "⠙";
    }
    20% {
      content: "⠹";
    }
    30% {
      content: "⠸";
    }
    40% {
      content: "⠼";
    }
    50% {
      content: "⠴";
    }
    60% {
      content: "⠦";
    }
    70% {
      content: "⠧";
    }
    80% {
      content: "⠇";
    }
    90% {
      content: "⠏";
    }
  }
</style>