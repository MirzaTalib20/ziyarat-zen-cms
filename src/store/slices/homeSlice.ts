import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CtaButton {
  id: string;
  text: string;
  link: string;
}

export interface HeroSection {
  headline: string;
  subheading: string;
  backgroundMedia: string;
  mediaType: 'image' | 'video';
  ctaButtons: CtaButton[];
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  quote: string;
  rating: number;
}

interface HomeState {
  hero: HeroSection;
  testimonials: Testimonial[];
}

const initialState: HomeState = {
  hero: {
    headline: 'Embark on a Sacred Journey',
    subheading: 'Discover Spiritual Ziyarat Tours to Iran & Iraq',
    backgroundMedia: '',
    mediaType: 'image',
    ctaButtons: [
      { id: '1', text: 'View Packages', link: '/packages' },
      { id: '2', text: 'Contact Us', link: '/contact' },
    ],
  },
  testimonials: [
    {
      id: '1',
      name: 'Sarah Ahmed',
      photo: '',
      quote: 'A transformative spiritual experience that exceeded all expectations.',
      rating: 5,
    },
  ],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    updateHeroHeadline: (state, action: PayloadAction<string>) => {
      state.hero.headline = action.payload;
    },
    updateHeroSubheading: (state, action: PayloadAction<string>) => {
      state.hero.subheading = action.payload;
    },
    updateHeroMedia: (state, action: PayloadAction<{ media: string; type: 'image' | 'video' }>) => {
      state.hero.backgroundMedia = action.payload.media;
      state.hero.mediaType = action.payload.type;
    },
    addCtaButton: (state, action: PayloadAction<CtaButton>) => {
      state.hero.ctaButtons.push(action.payload);
    },
    updateCtaButton: (state, action: PayloadAction<CtaButton>) => {
      const index = state.hero.ctaButtons.findIndex(btn => btn.id === action.payload.id);
      if (index !== -1) {
        state.hero.ctaButtons[index] = action.payload;
      }
    },
    removeCtaButton: (state, action: PayloadAction<string>) => {
      state.hero.ctaButtons = state.hero.ctaButtons.filter(btn => btn.id !== action.payload);
    },
    addTestimonial: (state, action: PayloadAction<Testimonial>) => {
      state.testimonials.push(action.payload);
    },
    updateTestimonial: (state, action: PayloadAction<Testimonial>) => {
      const index = state.testimonials.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.testimonials[index] = action.payload;
      }
    },
    removeTestimonial: (state, action: PayloadAction<string>) => {
      state.testimonials = state.testimonials.filter(t => t.id !== action.payload);
    },
  },
});

export const {
  updateHeroHeadline,
  updateHeroSubheading,
  updateHeroMedia,
  addCtaButton,
  updateCtaButton,
  removeCtaButton,
  addTestimonial,
  updateTestimonial,
  removeTestimonial,
} = homeSlice.actions;

export default homeSlice.reducer;
