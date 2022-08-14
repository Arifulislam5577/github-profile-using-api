import * as Icons from "phosphor-icons";

/*

 <div
              class="flex md:flex-row flex-col items-center justify-between gap-10 md:gap-5 md:mt-10"
            >
              <div
                class="hero-text w-full md:w-1/2 text-center flex flex-col items-center justify-center md:justify-start md:items-start"
              >
                <h1
                  class="md:text-5xl text-3xl font-bold uppercase text-center md:text-left"
                >
                  <span class="text-orange-500">GitHub</span> is where people
                  build <span class="text-orange-500">software</span>
                </h1>
                <p
                  class="my-3 mb-6 text-center md:text-left text-gray-400 text-base"
                >
                  GitHub is where over 83 million developers shape the future of
                  software, together. Contribute to the open source community,
                  manage your Git repositories
                </p>
                <button
                  class="p-3 shadow-lg border-none text-sm font-bold cursor-pointer bg-orange-500 text-white flex items-center justify-between gap-2 px-6 rounded-full duration-300 transition-all hover:translate-y-1 animate-bounce"
                >
                  <i class="ph-monitor-play"></i> <span>Learn GitHub</span>
                </button>
              </div>
              <div class="w-full md:w-1/2">
                <img src="img/profile.svg" alt="profile" class="w-full" />
              </div>
            </div>




            // 


             
              
              
         


*/

const heroArea = document.getElementById("hero-area");
const usernameValue = document.getElementById("username");
const form = document.getElementById("form");
const profile = document.getElementById("profile");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (usernameValue.value) {
    getUserInfo(usernameValue.value);
  }
});

const generateMarkUp = (profileInfo) => {
  const { avatar_url, followers, following, name, public_repos } = profileInfo;
  const markUp = `
    
       <div class="col-span-1" >
                <div class="p-5 shadow bg-white">
                  <div class="profile-img">
                    <img
                      src="${avatar_url}"
                      alt="profile"
                      class="rounded-full h-32 w-32 mx-auto"
                    />
                  </div>
                  <div class="profile-info my-5">
                    <h3
                      class="font-bold text-center text-white bg-orange-500 p-3 text-xl"
                    >
                      ${name}
                    </h3>

                    <ul class="mt-3">
                      <li class="flex items-center gap-3 uppercase">
                        <i class="ph-users-three text-orange-500 text-base"></i>
                        <span class="text-base font-bold">following</span>
                        <span class="text-base font-bold">${following}</span>
                      </li>

                      <li class="flex items-center gap-3 uppercase">
                        <i class="ph-users-three text-orange-500 text-base"></i>
                        <span class="text-base font-bold">followers</span>
                        <span class="text-base font-bold">${followers}</span>
                      </li>
                      <li class="flex items-center gap-3 uppercase">
                        <i class="ph-database text-orange-500 text-base"></i>
                        <span class="text-base font-bold">repositories</span>
                        <span class="text-base font-bold">${public_repos}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                </div>
              
    
    `;

  profile.insertAdjacentHTML("beforebegin", markUp);
};

const generateMarkUp2 = (repository) => {
  const { name, language, visibility, git_url } = repository;
  console.log(repository);
  const markUp = `
   
                <div class="col-span-1">
                  <div class="box shadow p-5 bg-white">
                    <h3
                      class="text-sm flex items-center gap-2 font-bold text-gray-700 mb-2 uppercase"
                    >
                      <i class="ph-airplane-tilt text-orange-500"></i
                      >${name}
                    </h3>
                    <div class="flex items-center justify-between">
                      <h4
                        class="flex items-center gap-1 text-sm text-gray-500 uppercase"
                      >
                        <i class="ph-globe text-sm text-orange-500"></i>${language}
                      </h4>

                      <h4
                        class="flex items-center gap-1 text-sm text-gray-500 uppercase"
                      >
                        <i class="ph-eye text-sm text-orange-500"></i>${visibility}
                      </h4>
                      <h4
                        class="flex items-center gap-1 text-sm text-gray-500 uppercase"
                      >
                        <i class="ph-link text-sm text-orange-500"></i
                        ><a href="${git_url}">Code</a>
                      </h4>
                    </div>
                  </div>
                </div>
             
    
    `;

  document.getElementById("repo").insertAdjacentHTML("beforebegin", markUp);
};

async function getUserInfo(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const result = await res.json();

  generateMarkUp(result);

  async function getRepositories(url) {
    const res = await fetch(`${url}`);
    const result = await res.json();

    result?.map((repository) => generateMarkUp2(repository));
  }

  result && getRepositories(result?.repos_url);
}
