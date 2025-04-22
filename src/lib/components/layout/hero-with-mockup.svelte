<script lang="ts">
  // Props definieren
  export let title: string;
  export let description: string;
  export let primaryCta: { text: string; href: string };
  export let secondaryCta: { text: string; href: string } | undefined = undefined;
  export let mockupImage: { src: string; alt: string; width?: number; height?: number };
  export let className: string = "";

  import { cn } from '../../utils.js';
  import Button from "$lib/components/Button.svelte";
  import Mockup from "$lib/components/ui/mockup.svelte";
  import Glow from "$lib/components/ui/glow.svelte";
</script>

<section
  class={cn(
    "relative bg-primary-dark-blue text-white",
    "py-12 md:py-20",
    "overflow-hidden",
    className
  )}
>
  <div class="relative mx-auto max-w-[1280px] flex flex-col gap-12 lg:gap-24">
    <div class="relative z-10 flex flex-col items-center gap-6 pt-8 md:pt-16 text-center lg:gap-12 px-4">
      <!-- Heading -->
      <h1
        class={cn(
          "inline-block animate-appear",
          "text-white",
          "text-3xl md:text-4xl font-bold tracking-tight",
          "leading-[1.1] sm:leading-[1.1]",
          "drop-shadow-sm"
        )}
      >
        {title}
      </h1>

      <!-- Description -->
      <p
        class={cn(
          "max-w-[550px]",
          "text-xl md:text-2xl",
          "text-white",
          "font-medium"
        )}
      >
        {description}
      </p>

      <!-- CTAs -->
      <div
        class="relative z-10 flex flex-wrap justify-center gap-4"
      >
        <Button
          href={primaryCta.href}
          size="default"
        >
          {primaryCta.text}
          <img src="/icons/arrow-right-bold.svg" alt="" class="ml-2 h-[18px] w-[18px] inline-block" aria-hidden="true" />
        </Button>
        {#if secondaryCta}
          <Button
            href={secondaryCta.href}
            size="default"
            variant="primary"
            class="bg-cta-orange text-white hover:bg-cta-orange-hover rounded-xl flex items-center justify-center"
          >
            <span>{secondaryCta.text}</span>
            <img src="/icons/chat-circle-dots.svg" alt="" class="ml-2 h-[18px] w-[18px] flex-shrink-0" aria-hidden="true" />
          </Button>
        {/if}
      </div>

      <!-- Mockup -->
      <div class="relative w-full pt-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Mockup
          className={cn(
            "shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]",
            "border-white/10"
          )}
        >
          <img
            src={mockupImage.src}
            alt={mockupImage.alt}
            width={mockupImage.width}
            height={mockupImage.height}
            class="w-full h-auto"
            loading="lazy"
            decoding="async"
          />
        </Mockup>
      </div>
    </div>
  </div>

  <!-- Background Glow -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <Glow
      variant="above"
      className="bg-white/30 opacity-75 blur-3xl"
    />
  </div>
</section>