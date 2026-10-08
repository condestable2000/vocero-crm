# Plan: Vocero 1.5 y 2.0

Fecha: 2026-10-07. Estado: propuesta del autor; se discute en los issues de los
hitos **1.5.0** y **2.0.0** del repositorio.

## Por qué

Vocero quiere ser el CRM de WhatsApp que una agencia instala en una tarde y
modifica con la IA que use (Claude Code, Codex, OpenCode): intuitivo, ligero,
desplegable en cualquier servidor y con un agente que se entiende y se prueba.
La 1.4.0 ya hace el trabajo; lo que sigue es ordenarla, bajarle fricción y
dejar de tener el agente partido en dos.

Este plan sale de cuatro auditorías sobre la 1.4.0: un fork de la comunidad
con más pantallas y mejor organización; la edición cloud (vocerocrm.com), que
ya resolvió el arranque y el token de IA desde la interfaz; el agente incluido
contra Nea; y qué tan fácil es desplegar y leer el repositorio.

## Principios que no cambian

1. **Una instancia = un negocio.** Multi-empresa es cosa de la edición cloud.
2. **Solo la Cloud API oficial.** Nada de WhatsApp por código QR: Meta banea
   números y las credenciales quedan en claro.
3. **`/api/bot/*` es un contrato público y se congela.** Quien tenga su propio
   cerebro sigue funcionando en 1.5 y en 2.0.
4. **Un runtime, varios roles.** El agente es uno (recibir, transcribir, leer
   adjuntos, llamar al modelo, ejecutar herramientas, formatear, vigilar). Lo
   que cambia por negocio son datos: instrucciones, herramientas encendidas,
   conocimiento y clientes simulados del Laboratorio.
5. **Menor = redesplegar. Mayor = hacer algo a mano** (README, «Versiones»).

## 1.5.0 — todo se actualiza redesplegando

| # | Qué | De dónde | Tamaño |
|---|---|---|---|
| 1 | Menú agrupado y Ajustes en tres secciones: **Canales / Agente / Negocio** | fork de la comunidad (idea) | M |
| 2 | **Guía de inicio**: primera pantalla con 3–4 pasos (agente, token, WhatsApp, agenda) y botón «Encender» | cloud (#91, #78, #95) | M |
| 3 | **Token de IA desde la interfaz**, cifrado, con «Probar conexión», «Traer modelos» y registro de llamadas; las variables de entorno quedan como respaldo | cloud (`ai_credentials`) + fork | M–G |
| 4 | **Registrar el webhook en Meta** al guardar la conexión y botón para desconectar el número | cloud (#75) | M |
| 5 | Plantillas explicadas (idiomas con nombre, ejemplos, vista previa, avisos), 29 monedas, reloj de la agenda en móvil | cloud (#90, #95) | S |
| 6 | **`AGENTS.md`** neutral con el mapa del código; `CLAUDE.md` delega en él | nuevo | S |
| 7 | **`pnpm doctor`** (valida entorno, base, volumen, token) y `docker compose up` sin editar nada (secretos generados, `localhost` por defecto) | nuevo | S |
| 8 | Manifests para Railway, Render y Fly | nuevo | S |
| 9 | Imagen más delgada (sin `drizzle/meta`, mocks fuera del bundle) y `/api/health` con las banderas activas | nuevo | S |
| 10 | Pendientes de seguridad del issue #78 (adjuntos, Next, botones, fixtures) | auditoría 1.4.0 | S–M |

Orden sugerido: 6 → 7 → 9 → 5 → 4 → 3 → 2 → 1 → 8. Primero lo que ayuda a
todo lo demás (que el repo se explique solo), luego lo que baja de cloud, y la
interfaz al final porque depende del token y de la guía.

## 2.0.0 — un solo agente

Hoy el agente vive dos veces: incompleto dentro de Vocero (una llamada por
turno, solo texto) y completo en Nea (fuera, en Python, con su propio
Postgres y un relay). De las ~7,900 líneas de Nea, ~4,000 existen solo por
vivir fuera. Lo que la raíz no tiene son ~2,000 líneas de conducta: audio,
imagen y PDF; candado «sin rumbo»; seguimiento; hostilidad; formato de
WhatsApp; blindaje contra sondas; ficha estructurada; reprogramar citas. Y
Nea, en modo estándar, deja sin agente a Instagram y Messenger.

- **Runtime unificado** en `src/server/agent/`: módulos por capacidad
  (`turn`, `tools`, `media`, `stall`, `followup`, `hostilidad`, `formato`,
  `blindaje`) detrás de una interfaz `AgentProvider`. Un contenedor, un
  Postgres, un `pnpm test`.
- **Roles como presets** (datos, no código): instrucciones + herramientas
  encendidas + conocimiento + personas del Laboratorio. En 2.0 solo el
  **Calificador** (el agente de hoy).
- **Laboratorio por rol**: personas configurables, no cableadas.
- **Paridad antes de apagar nada**: los nueve escenarios de la prueba de
  punta a punta de Nea corren contra el agente interno, y el Laboratorio cubre
  hostilidad, sin rumbo y audio.
- **Nea** queda como referencia del contrato `/api/bot/*` (documentado con
  OpenAPI); su modo estándar pasa a mantenimiento con una guía para volver el
  webhook al CRM. La edición cloud hereda el módulo y deja de necesitar un
  cerebro aparte.
- **Adaptador de almacenamiento** (`fs` por defecto, S3 opcional): la puerta
  a plataformas sin disco.

Es Mayor por la regla del README: quien corre Nea delante de Vocero tendrá
que mover el webhook de Meta de vuelta al CRM y encender el agente incluido.

## Después (2.1 en adelante)

- **Catálogo de productos** y el rol **Vendedor** (información, precios,
  fotos, apartados).
- **Soporte** (tickets) y **Cobranza** (facturas), cuando haya un negocio
  real que los pida.
- Telegram por la Bot API oficial; TikTok si hay demanda.
- Vercel y similares, cuando el adaptador de almacenamiento y las colas lo
  permitan. Hoy Vocero corre tal cual en cualquier Docker (Coolify, Railway,
  Render, Fly, un VPS).

## Lo que no entra, y por qué

- **WhatsApp por código QR** (Baileys): protocolo no oficial, números
  baneados, credenciales sin cifrar, `git` dentro de la imagen.
- **Userbot de Telegram**: automatiza cuentas personales y guarda sesiones en
  claro.
- **Varias empresas en una instancia**: contradice el principio 1.
- **Orquestador de dos llamadas por turno**: duplica latencia y costo; el
  enrutamiento entre roles se hace por etapa o etiqueta, no con otro modelo.
- **Una pestaña de Ajustes por canal**: con cinco canales son trece pestañas.
