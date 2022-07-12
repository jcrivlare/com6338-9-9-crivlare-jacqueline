const api_key = "8ecac9ebfb54144eef31588a12e23a03";
const form = document.querySelector("form");
const section = document.getElementById("weather");
const search = document.getElementById("weather-search");

form.onsubmit = async (e) => {
  e.preventDefault();
  let query = search.value;
  search.value = "";
  section.innerHTML = "";
  // this.ClearForm();

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${api_key}`;

  await fetch(URL).then((response) => {
    console.log(response);
    response.json().then((data) => {
      console.log("data", data);

      /* In Case Of Error */
      if (data.cod === "404" || data.cod === "400" || data.data?.cod === 404) {
        let h2 = document.createElement("h2");
        h2.innerHTML = "Location Not Found";
        section.replaceChildren(h2);
        return;
      } else {
        /* In Case Of Success */
        let locationString = data.name + ", " + data.sys.country;
        let city = createElement("h2", { innerHTML: locationString });
        let mapLink = createElement("a", {
          innerHTML: "Click to view map",
          href: `https://www.google.com/maps/search/?api=1&query=${data.coord.lat},${data.coord.lon}`,
          target: "__BLANK",
        });
        let icon = createElement("img", {
          src: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
        let condition = createElement(
          "p",
          {
            innerHTML: data.weather[0].description,
          },
          {
            textTransform: "capitalize",
          }
        );

        let current = createElement("p", {
          innerHTML: `Current: ${data.main.temp}&deg;`,
        });
        let feelsLike = createElement("p", {
          innerHTML: `Feels like: ${data.main.feels_like}&deg;`,
        });
        let date = new Date(data.dt * 1000);

        let lastUpdated = createElement("p", {
          innerHTML: `Last updated: ${date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}`,
        });

        section.replaceChildren(
          city,
          mapLink,
          icon,
          condition,
          current,
          feelsLike,
          lastUpdated
        );
      }
    });
  });
};

const createElement = (el, props, styles = null) => {
  let element = document.createElement(el);
  for (let prop in props) {
    element[prop] = props[prop];
  }
  if (styles) {
    for (let style in styles) {
      element.style[style] = styles[style];
    }
  }
  return element;
};

const ClearForm = () => {
  search.value = "";
  section.innerHTML = "";
};
