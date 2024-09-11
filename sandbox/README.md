# Physics / Sandbox

## Setting Up a Secure HTTP Development Server

> [!TIP]
>
> 1. Install [mkcert].
> 2. Generate locally-trusted development certificates: `mkcert -install`.
> 3. Create a certificate for `localhost`: `mkcert localhost 127.0.0.1 ::1`.
> 4. Copy the `localhost+3[-key].pem` files to a known path.
> 5. Use this path in your `~/.nuxtrc` file:
> ```ini
> ; echo "devServer.https.key=$HOME/localhost+3-key.pem" >>~/.nuxtrc
> devServer.https.cert=/home/.../localhost+3.pem
> devServer.https.key=/home/.../localhost+3-key.pem
> ```
>
> With these steps, Nuxt will run the development server using secure HTTP.

[mkcert]: https://github.com/FiloSottile/mkcert
