# Following steps to be implemented:
   Step 1: finalize the architecture + technology choices
   Step 2: create the monorepo
   Step 3: build Node API + PostgreSQL
   Step 4: define tenant/data-source architecture
   Step 5: build the AI service
   Step 6: build RAG
   Step 7: build React chat widget
   Step 8: build admin dashboard
   Step 9: make the widget embeddable
   Step 10: Docker + deployment + security + observability


# Basic Idea

                    AI Portfolio Chatbot
                            │
              ┌─────────────┴─────────────┐
              │                           │
           Frontend                    Backend
           React/Vite                 Node/Express
              │                           │
              │                           │
              └────────── HTTP ───────────┘
                                          │
                                          ▼
                                      PostgreSQL
