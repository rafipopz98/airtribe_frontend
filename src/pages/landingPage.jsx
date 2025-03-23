import React, { useState } from "react";
import { menuItems } from "../helpers/constants";
import { Link } from "react-router-dom";
import { ROUTERS } from "../helpers/routes";
import Logo from "/logo.png";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const [menuState, setMenuState] = useState(false);

  return (
    <div
      data-state={menuState && "active"}
      className="fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent"
    >
      <Navbar />
      <main>
        <section className="overflow-hidden ">
          <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl">
                Upskill for professional excellence
              </h1>
              <p className="mx-auto my-8 max-w-2xl text-xl">
                Social learning and expert-led programs to start, transition or
                boost your career
              </p>

              <button className="cursor-pointer inline-flex h-12 items-center justify-center rounded-md border border-slate-400 bg-transparent px-6 font-medium text-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-clip-text transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <Link to={ROUTERS.USER.FORM}>
                  <span className="btn-label">Get Started</span>
                </Link>
              </button>
            </div>
          </div>

          <div className="mx-auto -mt-16 max-w-7xl">
            <div className="perspective-distant -mr-16 pl-16 lg:-mr-56 lg:pl-56">
              <div className="[transform:rotateX(20deg);]">
                <div className="lg:h-176 relative skew-x-[.36rad]">
                  <img
                    className="rounded-(--radius) z-1 relative border object-fit"
                    src="/card.png"
                    alt="tailus ui hero section"
                    width={2880}
                    height={2074}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-background relative z-10 py-16">
          <div className="m-auto max-w-5xl px-6">
            <h2 className="text-center text-lg font-medium">
              Your favorite companies are our partners.
            </h2>
            <div className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
              <img
                className="h-5 w-fit"
                src="https://html.tailus.io/blocks/customers/nvidia.svg"
                alt="Nvidia Logo"
                height="20"
                width="auto"
              />
              <img
                className="h-4 w-fit"
                src="https://html.tailus.io/blocks/customers/column.svg"
                alt="Column Logo"
                height="16"
                width="auto"
              />
              <img
                className="h-4 w-fit"
                src="https://html.tailus.io/blocks/customers/github.svg"
                alt="GitHub Logo"
                height="16"
                width="auto"
              />
              <img
                className="h-5 w-fit"
                src="https://html.tailus.io/blocks/customers/nike.svg"
                alt="Nike Logo"
                height="20"
                width="auto"
              />
              <img
                className="h-4 w-fit"
                src="https://html.tailus.io/blocks/customers/laravel.svg"
                alt="Laravel Logo"
                height="16"
                width="auto"
              />
              <img
                className="h-7 w-fit"
                src="https://html.tailus.io/blocks/customers/lilly.svg"
                alt="Lilly Logo"
                height="28"
                width="auto"
              />
              <img
                className="h-5 w-fit"
                src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                alt="Lemon Squeezy Logo"
                height="20"
                width="auto"
              />
              <img
                className="h-6 w-fit"
                src="https://html.tailus.io/blocks/customers/openai.svg"
                alt="OpenAI Logo"
                height="24"
                width="auto"
              />
              <img
                className="h-4 w-fit"
                src="https://html.tailus.io/blocks/customers/tailwindcss.svg"
                alt="Tailwind CSS Logo"
                height="16"
                width="auto"
              />
              <img
                className="h-5 w-fit"
                src="https://html.tailus.io/blocks/customers/vercel.svg"
                alt="Vercel Logo"
                height="20"
                width="auto"
              />
              <img
                className="h-5 w-fit"
                src="https://html.tailus.io/blocks/customers/zapier.svg"
                alt="Zapier Logo"
                height="20"
                width="auto"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
