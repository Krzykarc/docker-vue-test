<script setup lang="ts">
import { Button } from '@/design-system';
import { useRouter } from 'vue-router';
import { useCssModule } from 'vue';

const router = useRouter();
const styles = useCssModule();

const navigateToCollection = () => {
  router.push('/lego');
};
</script>

<template>
  <main :class="styles.welcomePage" role="main">
    <section :class="styles.hero" aria-label="Welcome section">
      <div :class="styles.heroContent">
        <h1 :class="styles.title">Welcome to the LEGO Sets Collection</h1>
        <p :class="styles.subtitle">Discover, explore, and find your next favorite LEGO set</p>
        <Button 
          @click="navigateToCollection"
          size="large"
          :class="styles.ctaButton"
        >
          Explore Collection
        </Button>
      </div>
    </section>

    <section :class="styles.features" aria-label="Features section">
      <div :class="styles.featureCard">
        <div :class="styles.featureIcon">🔍</div>
        <h2 :class="styles.featureTitle">Easy Search</h2>
        <p :class="styles.featureDescription">Find exactly what you're looking for with our powerful search and filter system</p>
      </div>

      <div :class="styles.featureCard">
        <div :class="styles.featureIcon">📊</div>
        <h2 :class="styles.featureTitle">Detailed Information</h2>
        <p :class="styles.featureDescription">Get comprehensive details about each set, including piece count, price, and release year</p>
      </div>

      <div :class="styles.featureCard">
        <div :class="styles.featureIcon">🎯</div>
        <h2 :class="styles.featureTitle">Smart Filtering</h2>
        <p :class="styles.featureDescription">Filter sets by theme and sort them according to your preferences</p>
      </div>
    </section>

    <section :class="styles.ctaSection" aria-label="Call to action section">
      <h2 :class="styles.ctaTitle">Ready to Start Your LEGO Journey?</h2>
      <p :class="styles.ctaDescription">Join thousands of LEGO enthusiasts in exploring our extensive collection</p>
      <Button 
        @click="navigateToCollection"
        variant="outline"
        size="large"
      >
        View All Sets
      </Button>
    </section>
  </main>
</template>

<style module>
.welcomePage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3xl);
}

.hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  color: var(--text-light);
  padding: var(--spacing-4xl) var(--spacing-xl);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="rgba(255,255,255,0.1)"/></svg>');
  opacity: 0.1;
}

.heroContent {
  max-width: var(--container-max-width);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
  line-height: var(--line-height-tight);
  color: var(--text-light);
}

.subtitle {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xl);
  opacity: 0.9;
  color: var(--text-light);
}

.ctaButton {
  font-size: var(--font-size-md);
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--bg-primary);
  color: var(--primary-color);
  border: none;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.ctaButton:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  padding: var(--spacing-3xl) var(--spacing-xl);
  max-width: var(--container-max-width);
  margin: 0 auto;
}

.featureCard {
  text-align: center;
  padding: var(--spacing-xl);
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: transform var(--transition-fast);
}

.featureCard:hover {
  transform: translateY(-5px);
}

.featureIcon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
}

.featureTitle {
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

.featureDescription {
  color: var(--text-tertiary);
  line-height: var(--line-height-relaxed);
}

.ctaSection {
  text-align: center;
  padding: var(--spacing-3xl) var(--spacing-xl);
  background: var(--bg-secondary);
}

.ctaTitle {
  color: var(--text-primary);
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-md);
}

.ctaDescription {
  color: var(--text-tertiary);
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-xl);
}

@media (max-width: 768px) {
  .hero {
    padding: var(--spacing-3xl) var(--spacing-md);
  }

  .title {
    font-size: var(--font-size-2xl);
  }

  .subtitle {
    font-size: var(--font-size-md);
  }

  .features {
    grid-template-columns: 1fr;
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .ctaSection {
    padding: var(--spacing-2xl) var(--spacing-md);
  }

  .ctaTitle {
    font-size: var(--font-size-xl);
  }
}

/* Focus styles for better keyboard navigation */
:global(:focus-visible) {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Ensure sufficient color contrast */
@media (prefers-reduced-motion: reduce) {
  :global(*) {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style> 