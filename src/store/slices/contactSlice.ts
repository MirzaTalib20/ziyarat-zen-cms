import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ContactDetails {
  phone: string;
  email: string;
  whatsapp: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
}

interface ContactState {
  title: string;
  description: string;
  contactDetails: ContactDetails;
  mapEmbed: string;
  formFields: FormField[];
}

const initialState: ContactState = {
  title: 'Contact Us',
  description: 'Reach out to us for inquiries about our Ziyarat tours. We are here to guide you on your spiritual journey.',
  contactDetails: {
    phone: '+1 (555) 123-4567',
    email: 'info@ziyarattours.com',
    whatsapp: 'https://wa.me/15551234567',
  },
  mapEmbed: '',
  formFields: [
    { id: '1', label: 'Name', type: 'text' },
    { id: '2', label: 'Email', type: 'email' },
    { id: '3', label: 'Message', type: 'textarea' },
  ],
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    updateContactTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateContactDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    updateContactDetails: (state, action: PayloadAction<ContactDetails>) => {
      state.contactDetails = action.payload;
    },
    updateMapEmbed: (state, action: PayloadAction<string>) => {
      state.mapEmbed = action.payload;
    },
    addFormField: (state, action: PayloadAction<FormField>) => {
      state.formFields.push(action.payload);
    },
    updateFormField: (state, action: PayloadAction<FormField>) => {
      const index = state.formFields.findIndex(field => field.id === action.payload.id);
      if (index !== -1) {
        state.formFields[index] = action.payload;
      }
    },
    removeFormField: (state, action: PayloadAction<string>) => {
      state.formFields = state.formFields.filter(field => field.id !== action.payload);
    },
  },
});

export const {
  updateContactTitle,
  updateContactDescription,
  updateContactDetails,
  updateMapEmbed,
  addFormField,
  updateFormField,
  removeFormField,
} = contactSlice.actions;

export default contactSlice.reducer;
