import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// Custom Home Icon component
const HomeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

// Custom Read Icon component
const ReadIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 4335 4335"
    fill="currentColor"
    clipRule="evenodd"
    fillRule="evenodd"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="m1240 124h2055c181 0 330 148 330 330v2849c0 181-148 330-330 330h-2055c-4 0-8 0-12 0-288 208-13 364-13 364h1115 543 68 330 26 139 3c47 2 84 40 84 87 0 48-39 87-87 87h-252c-14 2-29 3-44 3h-2055c-181 0-330-148-330-330v-3245c0-4 0-7 0-11 5-252 186-369 325-422 47-26 102-41 159-41zm838 759h339v436h402v339h-402v1173h-339v-1173h-402v-339h402z"></path>
    </g>
  </svg>
);

// Custom Community Icon component
const CommunityIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 512 512"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="m436.667 373.842c-41.539 0-75.333 33.794-75.333 75.333v62.062h150.666v-62.062c0-41.539-33.794-75.333-75.333-75.333z"></path>
      <path d="m75.333 373.842c-41.539 0-75.333 33.794-75.333 75.333v62.062h150.667v-62.062c0-41.539-33.795-75.333-75.334-75.333z"></path>
      <path d="m256 373.842c-41.539 0-75.333 33.794-75.333 75.333v62.062h150.667v-62.062c-.001-41.539-33.795-75.333-75.334-75.333z"></path>
      <path d="m241 .763h30v45h-30z"></path>
      <path d="m168.844 12.191h30v45h-30z" transform="matrix(.951 -.309 .309 .951 -1.723 58.507)"></path>
      <path d="m103.752 45.358h30v45h-30z" transform="matrix(.809 -.588 .588 .809 -17.206 82.761)"></path>
      <path d="m52.094 97.015h30v45h-30z" transform="matrix(.588 -.809 .809 .588 -69.033 103.546)"></path>
      <path d="m18.928 162.108h30v45h-30z" transform="matrix(.309 -.951 .951 .309 -152.128 159.827)"></path>
      <path d="m0 241.763h45v30h-45z"></path>
      <path d="m467 241.763h45v30h-45z"></path>
      <path d="m455.572 169.608h45v30h-45z" transform="matrix(.951 -.309 .309 .951 -33.648 156.761)"></path>
      <path d="m422.405 104.515h45v30h-45z" transform="matrix(.809 -.588 .588 .809 14.721 284.337)"></path>
      <path d="m370.748 52.858h45v30h-45z" transform="matrix(.588 -.809 .809 .588 107.203 346.114)"></path>
      <path d="m305.655 19.691h45v30h-45z" transform="matrix(.309 -.951 .951 .309 193.758 336.066)"></path>
      <ellipse cx="165.667" cy="159.627" rx="36.802" ry="36.802" transform="matrix(.707 -.707 .707 .707 -64.351 163.898)"></ellipse>
      <ellipse cx="346.333" cy="159.627" rx="36.803" ry="36.802" transform="matrix(.973 -.23 .23 .973 -27.41 83.842)"></ellipse>
      <path d="m375.372 363.569c-3.536-8.138-5.508-17.106-5.508-26.53 0-31.677 22.169-58.255 51.802-65.083v-.193c0-41.539-33.794-75.333-75.333-75.333s-75.333 33.794-75.333 75.333v.193c29.633 6.828 51.803 33.406 51.803 65.083 0 9.425-1.972 18.394-5.509 26.532 11.69 8.392 21.6 19.113 29.04 31.484 7.439-12.371 17.349-23.093 29.038-31.486z"></path>
      <path d="m194.706 363.571c-3.537-8.138-5.509-17.108-5.509-26.532 0-31.677 22.17-58.255 51.803-65.083v-.193c0-41.539-33.794-75.333-75.333-75.333s-75.333 33.794-75.333 75.333v.193c29.633 6.828 51.802 33.406 51.802 65.083 0 9.424-1.972 18.392-5.508 26.53 11.689 8.393 21.599 19.115 29.039 31.486 7.439-12.371 17.35-23.092 29.039-31.484z"></path>
      <ellipse cx="256" cy="337.039" rx="36.803" ry="36.802" transform="matrix(.987 -.16 .16 .987 -50.682 45.359)"></ellipse>
      <ellipse cx="75.333" cy="337.039" rx="36.803" ry="36.802" transform="matrix(.973 -.23 .23 .973 -75.421 26.324)"></ellipse>
      <ellipse cx="436.667" cy="337.039" rx="36.802" ry="36.802" transform="matrix(.707 -.707 .707 .707 -110.426 407.486)"></ellipse>
    </g>
  </svg>
);

// Custom Profile Icon component
const ProfileIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 460.8 460.8"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <g>
        <g>
          <path d="M230.432,239.282c65.829,0,119.641-53.812,119.641-119.641C350.073,53.812,296.261,0,230.432,0
              S110.792,53.812,110.792,119.641S164.604,239.282,230.432,239.282z"></path>
          <path d="M435.755,334.89c-3.135-7.837-7.314-15.151-12.016-21.943c-24.033-35.527-61.126-59.037-102.922-64.784
              c-5.224-0.522-10.971,0.522-15.151,3.657c-21.943,16.196-48.065,24.555-75.233,24.555s-53.29-8.359-75.233-24.555
              c-4.18-3.135-9.927-4.702-15.151-3.657c-41.796,5.747-79.412,29.257-102.922,64.784c-4.702,6.792-8.882,14.629-12.016,21.943
              c-1.567,3.135-1.045,6.792,0.522,9.927c4.18,7.314,9.404,14.629,14.106,20.898c7.314,9.927,15.151,18.808,24.033,27.167
              c7.314,7.314,15.673,14.106,24.033,20.898c41.273,30.825,90.906,47.02,142.106,47.02s100.833-16.196,142.106-47.02
              c8.359-6.269,16.718-13.584,24.033-20.898c8.359-8.359,16.718-17.241,24.033-27.167c5.224-6.792,9.927-13.584,14.106-20.898
              C436.8,341.682,437.322,338.024,435.755,334.89z"></path>
        </g>
      </g>
    </g>
  </svg>
);

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: HomeIcon, label: "Home", path: "/home" },
    { icon: ReadIcon, label: "Read", path: "/read" },
    { icon: null, label: "Create", path: "/scripture-explorer", isCenter: true },
    { icon: CommunityIcon, label: "Community", path: "/community" },
    { icon: ProfileIcon, label: "Profile", path: "/profile" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <nav className="grid grid-cols-5 gap-0 px-4 py-2 max-w-2xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          if (item.isCenter) {
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center -mt-6 relative"
              >
                <div className="bg-foreground text-background rounded-[32px] px-3.5 py-6 shadow-lg hover:scale-105 transition-transform">
                  {/* Speech bubble with sparkle icon */}
                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Speech bubble with rounded corners and tail */}
                    <path d="M4 2C2.89543 2 2 2.89543 2 4V16C2 17.1046 2.89543 18 4 18H9L12 22L15 18H20C21.1046 18 22 17.1046 22 16V4C22 2.89543 21.1046 2 20 2H4Z" />
                    {/* Four-pointed sparkle star in center - inverted color */}
                    <path d="M12 6.5L12.866 9.134C13.0392 9.63052 13.3695 10.0608 13.866 10.234L16.5 11.1L13.866 11.966C13.3695 12.1392 13.0392 12.5695 12.866 13.066L12 15.7L11.134 13.066C10.9608 12.5695 10.6305 12.1392 10.134 11.966L7.5 11.1L10.134 10.234C10.6305 10.0608 10.9608 9.63052 11.134 9.134L12 6.5Z" className="fill-foreground" />
                  </svg>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-foreground rounded-full"></div>
              </button>
            );
          }

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center py-2 transition-colors"
            >
              <Icon className={cn(
                "mb-1 text-foreground",
                item.label === "Profile" ? "h-5 w-5" : "h-6 w-6"
              )} />
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
};

export default Footer;
