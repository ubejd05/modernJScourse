class GitHub {
   constructor() {
      this.client_id = '7d1c8bd8f4858641465f';
      this.client_secret = '4556899ad625c38757b913496e8f7771a93184df';
      this.username = 'ubejd05';//optional it is for the second request(api auth issues)
      this.repos_count = 5;
      this.repos_sort = 'created: asc';
   }

   async getUser(user) {
      // const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
      // const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
      
      const profileResponse = await fetch(`https://api.github.com/users/${user}?username=${this.username}`);
      const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&username=${this.username}`);

      const profile = await profileResponse.json();
      const repos = await reposResponse.json();

      return {
         profile, //(es6+)same as saying "profile: profile"  cuz this is an object
         repos  
      }
   }
}

