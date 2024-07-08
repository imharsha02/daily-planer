// Structure

import { TypographyH1 } from "@/components/ui/TypographyH1";

/* 
    After signing in: App heading(at the center) user image(at the right end)
*/
const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <TypographyH1 className="max-w-full py-3 mx-auto">Daily planer</TypographyH1>
        {/* user avatar and name */}
    </div>
  );
};

export default Header;
