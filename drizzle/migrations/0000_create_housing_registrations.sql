CREATE TABLE public.housing_registrations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 full_name text NOT NULL,
 birth_date date NOT NULL,
 whatsapp text NOT NULL,
 email text NOT NULL,
 city text NOT NULL,
 state text NOT NULL,
 income text NOT NULL,
 employment text NOT NULL,
 owns_property boolean NOT NULL,
 family_size integer NOT NULL CHECK (family_size BETWEEN 1 AND 50),
 consent boolean NOT NULL CHECK (consent = true),
 consent_version text NOT NULL DEFAULT '2026-11-13',
 consent_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.housing_registrations TO service_role;
ALTER TABLE public.housing_registrations ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.housing_registrations IS 'Private housing information leads. Server-only insertion after validation and explicit consent; no visitor read access.';