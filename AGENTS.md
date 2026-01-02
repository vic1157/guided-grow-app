# Guided Grow App - Supabase Phase 0 Context

## Current status
- Working on Supabase integration, Phase 0 (decisions and UX alignment).

## Auth flow (current UX)
- Loading (/)
- Login (/login)
- Sign Up (/signup)
- Verify Email (/verify-email)
- Email Confirmed (/email-confirmed)

## Verification style
- Use 6-digit email OTP for /verify-email (Supabase OTP/verify flow)
- Password is set after OTP verification (update password post-verify)

## Onboarding flow (multi-step)
- Survey (/survey)
- Survey Results (/survey-results)
- Paywall (/paywall)
- Home (/home)
- Onboarding entry point is /home for both first-time and returning users
- Steps remain standalone routes (/survey, /survey-results, /paywall)

## Post-auth routing
- All post-auth landings redirect to /home
- /home shows the onboarding widget when incomplete
- If onboarding is complete, the widget can be closed

## User profile storage
- Use a public.profiles table keyed to auth.users.id
- Store first_name, last_name, username, onboarding fields, and plan status

## Onboarding state model (profile data)
- onboarding_step (integer): 0=survey, 1=survey-results, 2=paywall, 3=completed
- onboarding_updated_at (timestamp): last onboarding step update
- onboarding_completed_at (timestamp): set when step reaches 3
- survey_updated_at (timestamp): track survey retakes without resetting onboarding completion

## Gating rules
Unauthenticated:
- Allowed: /, /login, /signup, /verify-email, /email-confirmed
- Other routes redirect to /login

Authenticated + onboarding incomplete:
- Allowed: /home, /survey, /survey-results, /paywall
- Other routes redirect to /home (onboarding widget drives the next step via onboarding_step)

Authenticated + onboarding complete:
- Allowed: main app routes (e.g. /home, /profile, etc.)
- Also allowed: /survey and /survey-results for retake; /paywall for upgrades
- Do not reset onboarding completion for retakes (soft retake)

## Paywall behavior for paid users
- If user is on a paid plan, /paywall redirects to /home and opens the Manage Plan page

## Retake behavior
- Survey retake is initiated from a CTA within /survey; direct access is allowed
- Retake updates survey_updated_at; onboarding_completed_at remains intact

## Supabase integration - open questions
- Password reset UX: add a /reset-password route and decide OTP vs link flow?
- OAuth configuration: confirm production domain(s) and redirect URLs (dev + prod)?
- Email confirmation settings: should confirmation be required for email/password?
- Billing source of truth: where does plan status live (Stripe/subscriptions table vs profiles field)?
- Survey data persistence: where should retake history be stored (new table vs profile fields)?
