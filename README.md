![Typergotchi](/assets/typergotchi.png)

# 🐝Typergotchi ⌨️

Typergotchi is an innovative typing trainer app build with [🐝 Wasp](https://wasp-lang.dev/) that incorporates role-playing game (RPG) elements. The app allows users to improve their typing skills by completing levels and earning coins, which can be used to purchase new skins that enhance the user's experience during the story mode. In addition, users can compete against their friends in the PvP mode, where they can put their typing skills to the test. While the story mode and PvP mode are still in development, users can still sign up and train to type text in solo mode. Typergotchi is an engaging and fun way to improve typing skills while also enjoying RPG gameplay.

![Signup stage 2](/assets/signup-stage-2.png)

After selecting your boi, it is generating on server through jobs: [R2](https://r2.typergotchi.win/typergotchi/generatedBoiz/3-happy-12.png)

![space boi with cap](/assets/3-happy-12.png)

## TODO

- [x] 🐝 Solo mode
- [ ] 🐸 Story mode
- [ ] ⚔️ PvP mode

![Solo mode](/assets/solo-mode.png)

# Setup

Copy `.env.server.example` as `.env.server`, then fill in with approppriate values

<!-- TODO check if db migrate required  -->

**🌱 Seeding**

You can seed db by running `wasp db seed`

# Startup

In one terminal, run `wasp start db`

Then, in other terminal, run `wasp start`
