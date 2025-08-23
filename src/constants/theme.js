export const themes = {
  dark: {
    // Navbar
    navbar: {
      background: "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900",
      text: "text-white",
      shadow: "shadow-2xl",
      border: "border-gray-700",
    },

    // Logo
    logo: {
      gradient: "bg-gradient-to-r from-blue-400 to-purple-500",
      textClip: "bg-clip-text text-transparent",
    },

    // Navigation Links
    navLinks: {
      text: "text-white",
      hover: "hover:bg-gray-700 hover:text-blue-300",
      background: "",
    },

    // Buttons
    buttons: {
      primary: {
        background: "bg-gradient-to-r from-blue-600 to-purple-600",
        hover: "hover:from-blue-700 hover:to-purple-700",
        text: "text-white",
      },
      secondary: {
        background: "bg-gradient-to-r from-green-600 to-blue-600",
        hover: "hover:from-green-700 hover:to-blue-700",
        text: "text-white",
      },
      toggle: {
        background: "bg-gray-700",
        hover: "hover:bg-gray-600",
        text: "text-yellow-400",
        ring: "focus:ring-blue-500",
      },
    },

    // Mobile menu
    mobileMenu: {
      background: "",
      border: "border-gray-700",
      linkHover: "hover:bg-gray-700 hover:text-blue-300",
    },
  },

  light: {
    // Navbar
    navbar: {
      background: "bg-gradient-to-r from-white via-gray-50 to-white",
      text: "text-gray-800",
      shadow: "shadow-lg",
      border: "border-gray-200",
    },

    // Logo
    logo: {
      gradient: "bg-gradient-to-r from-blue-600 to-purple-600",
      textClip: "bg-clip-text text-transparent",
    },

    // Navigation Links
    navLinks: {
      text: "text-gray-700",
      hover: "hover:bg-gray-100 hover:text-blue-600",
      background: "",
    },

    // Buttons
    buttons: {
      primary: {
        background: "bg-gradient-to-r from-blue-500 to-purple-500",
        hover: "hover:from-blue-600 hover:to-purple-600",
        text: "text-white",
      },
      secondary: {
        background: "bg-gradient-to-r from-green-500 to-blue-500",
        hover: "hover:from-green-600 hover:to-blue-600",
        text: "text-white",
      },
      toggle: {
        background: "bg-gray-200",
        hover: "hover:bg-gray-300",
        text: "text-orange-500",
        ring: "focus:ring-blue-400",
      },
    },

    // Mobile menu
    mobileMenu: {
      background: "bg-gray-50",
      border: "border-gray-200",
      linkHover: "hover:bg-gray-100 hover:text-blue-600",
    },
  },
};
