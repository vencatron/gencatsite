# Overview

Generation Catalyst is a professional estate planning website built with React 18, TypeScript, and modern web technologies. It serves as a comprehensive digital presence for estate planning attorneys, providing information about services, client resources, and a secure client portal. The application focuses on estate planning services including wills, trusts, probate assistance, tax planning, and asset protection.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: React Router DOM for client-side navigation
- **Styling**: Tailwind CSS utility-first framework with custom color palette
- **Animations**: Framer Motion for smooth transitions and scroll-triggered animations
- **Component Structure**: Modular architecture with reusable components in `/common/` and page-specific sections in `/sections/`

## Design System
- **Typography**: Custom font stack with Freight Serif Pro, Playfair Display, and fallbacks
- **Color Palette**: Warm, neutral, and professional tones with primary, secondary, accent, and neutral color scales
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Animation Strategy**: Scroll-triggered animations using custom hooks for enhanced user experience

## Code Organization
- **Strict TypeScript**: Enabled with comprehensive linting rules and type checking
- **Path Aliases**: Configured for clean imports (`@/components/*`, `@/pages/*`, etc.)
- **Hook-based Logic**: Custom hooks for form management (`useForm`) and scroll animations (`useScrollAnimation`)
- **Utility Functions**: Centralized helpers for validation, formatting, and common operations
- **Constants Management**: Centralized application constants for company information and configuration

## Development Workflow
- **Linting**: ESLint with TypeScript rules and automatic fixing capabilities
- **Build Process**: TypeScript compilation followed by Vite production build
- **Development Server**: Hot module replacement with Vite dev server
- **Code Quality**: Strict TypeScript settings with unused variable detection and comprehensive type checking

# External Dependencies

## Core Framework Dependencies
- **React 18.2.0**: Main UI framework with modern features
- **React DOM 18.2.0**: DOM rendering for React components
- **React Router DOM 6.15.0**: Client-side routing and navigation
- **Framer Motion 10.16.0**: Animation library for smooth transitions and interactions

## Development Tools
- **Vite 4.4.5**: Fast build tool and development server
- **TypeScript 5.0.2**: Static type checking and modern JavaScript features
- **ESLint 8.45.0**: Code linting with TypeScript support
- **Tailwind CSS 3.3.3**: Utility-first CSS framework
- **PostCSS 8.4.27**: CSS processing with Autoprefixer for vendor prefixes

## Font Integration
- **Google Fonts**: Inter, Playfair Display, and JetBrains Mono for typography
- **Custom Fonts**: Freight Serif Pro with proper font loading optimization

## Future Integrations
The application is structured to support future integrations including:
- Contact form submission services
- Client portal authentication systems
- Document management platforms
- Payment processing for consultations
- CRM integration for client management
- Email marketing services for client communication

The codebase includes placeholder components and form handling that can be easily connected to backend services when required.