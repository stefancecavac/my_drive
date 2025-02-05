import { NavLink } from "react-router-dom";

type pageLinkComponentProps = {
  linkTo: string;
  icon: React.ReactElement<React.SVGProps<SVGElement>>;
  title: string;
};

export const PageLinkComponent = ({ icon, linkTo, title }: pageLinkComponentProps) => {
  return (
    <NavLink
      to={`${linkTo}`}
      className={({ isActive }) =>
        `flex btn btn-ghost btn-sm justify-start gap-5 rounded-lg p-2  hover:bg-base-100 transition-all ${
          isActive ? "bg-base-100 border-neutral text-base-content " : ""
        }`
      }
    >
      {icon}
      <p className="text-[1.1em]  text-base-300">{title}</p>
    </NavLink>
  );
};
