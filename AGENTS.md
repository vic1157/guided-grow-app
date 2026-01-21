# Guided Grow App - Supabase Phase 0 Context

## Current status
- Working on Supabase integration, Phase 0 (decisions and UX alignment).

## Auth flow (current UX)
- Routes: / (loading), /login, /signup, /verify-email (OTP verify, then set password), /email-confirmed, /reset-password (unauth email link), /change-password (authenticated, requires current password)
- Typical signup progression: /signup → /verify-email (OTP) → set password → /email-confirmed → /home
- Typical reset progression: /reset-password → email link → set new password → /login
- Typical change progression: /change-password (while authenticated, requires current password)

## Verification style
- Use 6-digit email OTP for /verify-email (Supabase OTP/verify flow)
- Password is set after OTP verification (update user password post-verify)

## Onboarding flow (multi-step)
- Routes: /home (entry), /survey, /persona-wheel, /survey-results, /paywall, completion step 4
- Typical progression: step 0 /survey → step 1 /persona-wheel → step 2 /survey-results → step 3 /paywall → step 4 completion after paywall click-through
- Steps remain standalone routes (/survey, /persona-wheel, /survey-results, /paywall)

## Post-auth routing
- All post-auth landings redirect to /home
- /home shows the onboarding widget when onboarding incomplete (onboarding_step < 4)
- Widget can be closed when onboarding complete (onboarding_step >= 4)

## User profile storage & guardrails
- Use a public.profiles table keyed to auth.users.id
- Store first_name, last_name, username, onboarding fields, and plan status
- plan_status is enum-like for Phase 0: free, pro, cancelled (server-side updates only)
- onboarding_step, plan_status, survey_updated_at are server-only; clients can update first_name, last_name, username
- Insert is handled by trigger on auth.users; client inserts are revoked
- Update policy enforces auth.uid() = id on both USING and WITH CHECK
- Column grants: revoke update from authenticated; grant update only to first_name, last_name, username

## Onboarding state model (profile data)
- onboarding_step (integer): 0=survey, 1=persona-wheel, 2=survey-results, 3=paywall, 4=completed (after paywall click-through)
- onboarding_updated_at (timestamp): last onboarding step update
- onboarding_completed_at (timestamp): set when onboarding_step >= 4
- survey_updated_at (timestamp): track survey retakes without resetting onboarding completion (server-set)

## Gating rules
Unauthenticated:
- Allowed: /, /login, /signup, /verify-email, /email-confirmed, /reset-password
- Other routes redirect to /login

Authenticated + onboarding incomplete:
- Incomplete when onboarding_step < 4
- Allowed: /survey, /persona-wheel, /survey-results, /paywall
- /home and all other routes redirect to current onboarding step

Authenticated + onboarding complete:
- Allowed: main app routes (e.g. /home, /profile, etc.)
- Also allowed: /survey and /survey-results for retake; /paywall for upgrades
- Do not reset onboarding completion for retakes (soft retake)
- Onboarding routes redirect to /home

## Paywall behavior for paid users
- If user is on a paid plan, /paywall redirects to /home and opens the Manage Plan page
- Completion after paywall requires server-side step advance to 4

## Retake behavior
- Survey retake is initiated from a CTA within /survey; direct access is allowed
- Retake updates survey_updated_at; onboarding_completed_at remains intact

## Supabase integration - decisions & remaining questions
- OAuth configuration: confirm production domain(s) and redirect URLs (dev + prod)
- Email confirmation settings: should confirmation be required for email/password?
- Billing source of truth: Phase 0 uses plan_status in profiles; Stripe/subscriptions can replace later
- Survey data persistence: decide where retake history lives (new table vs profile fields)

## Account Management - Decisions/Questions
- Password flows: have both /reset-password (unauth email link) and /change-password (authenticated + current password)
- For email changes: decide link-based vs OTP confirmation
- Account deletion: decide hard delete vs soft delete
- Google account linking: ship after onboarding is stable

## Supabase email setup checklist
- Update Auth email templates (Confirm signup, Magic Link, Recovery, Change Email) with Guided Grow branding
- Ensure OTP templates clearly show the 6-digit code and fallback instructions
- Configure custom SMTP for branded sender and better deliverability (optional)
- Set SITE_URL to the primary production domain (prod: https://ryb.lovable.app)
- Add redirect URLs to the allowlist (local + prod):
  - Local: http://localhost:8080/auth/callback, /reset-password, /verify-email, /email-confirmed
  - Prod: https://ryb.lovable.app/auth/callback, /reset-password, /verify-email, /email-confirmed
- Verify reset and auth callbacks land in the correct routes

## Server-side actions (recommended)
- Use a SECURITY DEFINER RPC for onboarding progression (enforce step ordering 0→1→2→3→4, set onboarding_completed_at at step 4, update survey_updated_at on retake, require auth.uid() = id)
- Keep plan_status updates in trusted server code (service role), not client/RPC
