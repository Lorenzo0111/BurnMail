![Title](https://github.com/Lorenzo0111/BurnMail/blob/main/media/Title.png?raw=true")

<div align="center">

[![GitHub Release](https://img.shields.io/github/v/release/Lorenzo0111/BurnMail)](https://github.com/Lorenzo0111/BurnMail/releases/latest)
[![GitHub License](https://img.shields.io/github/license/Lorenzo0111/BurnMail)](LICENSE)
[![Discord](https://img.shields.io/discord/1088775598337433662)](https://discord.gg/HT47UQXBqG)

</div>

## What is BurnMail

BurnMail is a simple service that allows you to create temporary email addresses that will be deleted after a certain amount of time.

![Dashboard](https://github.com/Lorenzo0111/BurnMail/blob/main/media/Dashboard.png?raw=true")

## Deploying

You'll have to set the following environment variables to setup the backend and frontend, here is a list of them:

- [Backend Environment Variables](api/.env.example)
- [Frontend Environment Variables](web/.env.example)

> 🚨 Remember to also edit the database id in the [wrangler.toml](api/wrangler.toml)

### Cloudflare Workers

You can deploy both, frontend and backend, to Cloudflare Workers by running the following commands:

```bash
pnpm install

# Deploy the backend
cd api
pnpm run deploy
```

The frontend can be deployed on cloudflare pages from their web dashboard.

### Selfhosting

If you want to selfhost, you can run `pnpm install`, `pnpm build` and `pnpm dev` to start the program.

The dashboard will usually be available [here](http://localhost:3000/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you need help, feel free to join the [Discord Server](https://discord.gg/HT47UQXBqG) or open an issue.
