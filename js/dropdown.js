const navData = {
  "what-we-do": {
    defaultTitle: "TCS is here to make a difference through technology.",
    defaultDescription:
      "Leading the way in innovation for over 50 years, we build greater futures for businesses across multiple industries and 131 countries.",
    defaultCta: "Discover all solutions",
    items: [
      {
        label: "Overview",
        title: "TCS is here to make a difference through technology.",
        description:
          "Leading the way in innovation for over 50 years, we build greater futures for businesses across multiple industries and 131 countries.",
        cta: "Discover all solutions",
      },
      {
        label: "Industries",
        title: "Transforming industries through innovation.",
        description:
          "We serve clients across Banking, Retail, Manufacturing, Healthcare, and more with tailored solutions that drive growth and efficiency.",
        cta: "Explore industries",
      },
      {
        label: "Services",
        title: "Comprehensive services for digital transformation.",
        description:
          "From consulting to implementation, our services help you navigate the complexities of modern business and technology.",
        cta: "View services",
      },
      {
        label: "Product and Platform",
        title: "Innovative products and platforms.",
        description:
          "Our suite of products and platforms accelerates your digital journey with proven, enterprise-grade solutions.",
        cta: "Explore products",
      },
      {
        label: "Research and Innovation",
        title: "Pioneering research for tomorrow's solutions.",
        description:
          "Our research teams explore emerging technologies and develop innovative solutions that shape the future of business.",
        cta: "Learn about research",
      },
    ],
  },
  "who-we-are": {
    defaultTitle:
      "We are a purpose-led organization that is building a meaningful future through innovation.",
    defaultDescription:
      "Our diverse community of over 600,000 people works together to make a difference for our customers, our colleagues and our planet.",
    defaultCta: "Learn more",
    items: [
      {
        label: "Overview",
        title:
          "We are a purpose-led organization that is building a meaningful future through innovation.",
        description:
          "Our diverse community of over 600,000 people works together to make a difference for our customers, our colleagues and our planet.",
        cta: "Learn more",
      },
      {
        label: "About Us",
        title: "Discover our story and values.",
        description:
          "Learn about our journey, our mission, and the values that guide everything we do at TCS.",
        cta: "About TCS",
      },
      {
        label: "Leadership",
        title: "Meet our leadership team.",
        description:
          "Our leaders bring decades of experience and vision to guide TCS into the future.",
        cta: "View leadership",
      },
      {
        label: "Heritage",
        title: "A legacy of innovation and excellence.",
        description:
          "Explore our rich history and the milestones that have shaped TCS over the decades.",
        cta: "Explore heritage",
      },
      {
        label: "Sustainability",
        title: "Building a sustainable future.",
        description:
          "Our commitment to environmental and social responsibility drives positive change for communities and the planet.",
        cta: "Learn about sustainability",
      },
    ],
  },
  insights: {
    defaultTitle:
      "Get expert analysis and perspectives on the trends shaping the future.",
    defaultDescription:
      "Explore our insights on AI, Cloud, Digital Transformation, and Sustainability to help your business stay ahead.",
    defaultCta: "View all insights",
    items: [
      {
        label: "Overview",
        title:
          "Get expert analysis and perspectives on the trends shaping the future.",
        description:
          "Explore our insights on AI, Cloud, Digital Transformation, and Sustainability to help your business stay ahead.",
        cta: "View all insights",
      },
      {
        label: "Digital Transformation",
        title: "Navigate your digital transformation journey.",
        description:
          "Insights and strategies to help you modernize operations, enhance customer experiences, and drive innovation.",
        cta: "Read insights",
      },
      {
        label: "Artificial Intelligence",
        title: "Harness the power of AI.",
        description:
          "Discover how AI and machine learning are transforming industries and creating new opportunities for growth.",
        cta: "Explore AI insights",
      },
      {
        label: "Cloud",
        title: "Accelerate with cloud solutions.",
        description:
          "Learn how cloud technologies enable agility, scalability, and innovation for modern enterprises.",
        cta: "Cloud insights",
      },
      {
        label: "Cyber Security",
        title: "Protect your digital assets.",
        description:
          "Stay ahead of evolving threats with our cybersecurity insights and best practices.",
        cta: "Security insights",
      },
    ],
  },
  careers: {
    defaultTitle: "Build your future with a community of innovators.",
    defaultDescription:
      "We are looking for passionate individuals who want to make a difference. Join us and help shape the future.",
    defaultCta: "Search jobs",
    items: [
      {
        label: "Overview",
        title: "Build your future with a community of innovators.",
        description:
          "We are looking for passionate individuals who want to make a difference. Join us and help shape the future.",
        cta: "Search jobs",
      },
      {
        label: "India",
        title: "Careers in India.",
        description:
          "Join our team in India and be part of our largest workforce driving innovation across the globe.",
        cta: "India opportunities",
      },
      {
        label: "Americas",
        title: "Careers in the Americas.",
        description:
          "Explore opportunities across North and South America to work on cutting-edge projects with global impact.",
        cta: "Americas opportunities",
      },
      {
        label: "Europe",
        title: "Careers in Europe.",
        description:
          "Join our European teams and contribute to digital transformation projects across diverse industries.",
        cta: "Europe opportunities",
      },
      {
        label: "Middle East and Africa",
        title: "Careers in Middle East and Africa.",
        description:
          "Be part of our growing presence in the Middle East and Africa, helping businesses transform and thrive.",
        cta: "MEA opportunities",
      },
    ],
  },
};

function createDropdownElement(data, key) {
  const dropdown = document.createElement("div");
  dropdown.className = `dropdown dropdown--${key}`;
  dropdown.id = `dropdown-${key}`;

  const navDiv = document.createElement("div");
  navDiv.className = "dropdown__nav";

  const list = document.createElement("ul");
  list.className = "dropdown__list";

  const contentDiv = document.createElement("div");
  contentDiv.className = "dropdown__content";

  const h3 = document.createElement("h3");
  h3.className = "dropdown__title";
  h3.textContent = data.items[0].title;

  const p = document.createElement("p");
  p.className = "dropdown__description";
  p.textContent = data.items[0].description;

  const ctaDiv = document.createElement("div");
  ctaDiv.className = "dropdown__cta";

  const a = document.createElement("a");
  a.href = "#";
  a.className = "dropdown__link";
  a.textContent = data.items[0].cta;

  ctaDiv.appendChild(a);
  contentDiv.appendChild(h3);
  contentDiv.appendChild(p);
  contentDiv.appendChild(ctaDiv);

  data.items.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "dropdown__item";

    if (index === 0) {
      li.classList.add("dropdown__item--active");
    }

    const span = document.createElement("span");
    span.textContent = item.label;

    const img = document.createElement("img");
    img.src = "./assets/svg/right-arrow-svgrepo-com.svg";
    img.alt = "right arrow";
    img.className = "dropdown__item--arrow";

    li.addEventListener("mouseenter", () => {
      list.querySelectorAll(".dropdown__item").forEach((item) => {
        item.classList.remove("dropdown__item--active");
      });

      li.classList.add("dropdown__item--active");

      h3.textContent = item.title;
      p.textContent = item.description;
      a.textContent = item.cta;
    });

    li.appendChild(span);
    li.appendChild(img);
    list.appendChild(li);
  });

  navDiv.appendChild(list);

  dropdown.appendChild(navDiv);
  dropdown.appendChild(contentDiv);

  return dropdown;
}

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav__link");

  Object.keys(navData).forEach((key) => {
    const dropdown = createDropdownElement(navData[key], key);
    dropdown.classList.add("dropdown--hidden");
    nav.appendChild(dropdown);
  });

  let hideTimeout = null;

  navLinks.forEach((link) => {
    const linkText = link.textContent.trim().toLowerCase().replace(/\s+/g, "-");
    if (navData[linkText]) {
      link.dataset.dropdown = linkText;

      link.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
        showDropdown(linkText);
      });

      link.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
          hideDropdown(linkText);
        }, 100);
      });
    }
  });

  function showDropdown(key) {
    clearTimeout(hideTimeout);

    document.querySelectorAll(".dropdown").forEach((d) => {
      d.classList.remove("dropdown--visible");
      d.classList.add("dropdown--hidden");
    });

    document.querySelectorAll(".nav__link").forEach((link) => {
      link.classList.remove("is-active");
    });

    const dropdown = document.getElementById(`dropdown-${key}`);
    const activeLink = document.querySelector(
      `.nav__link[data-dropdown="${key}"]`,
    );

    if (dropdown) {
      dropdown.classList.remove("dropdown--hidden");
      dropdown.classList.add("dropdown--visible");
      if (activeLink) activeLink.classList.add("is-active");

      dropdown.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
      });

      dropdown.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
          hideDropdown(key);
        }, 100);
      });
    }
  }

  function hideDropdown(key) {
    const dropdown = document.getElementById(`dropdown-${key}`);
    const activeLink = document.querySelector(
      `.nav__link[data-dropdown="${key}"]`,
    );

    if (dropdown) {
      dropdown.classList.remove("dropdown--visible");
      dropdown.classList.add("dropdown--hidden");
      if (activeLink) activeLink.classList.remove("is-active");
    }
  }
});
