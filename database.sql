CREATE TABLE public.site_content (
  id text PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site content" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE OR REPLACE FUNCTION public.save_site_content(pw text, payload jsonb)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF encode(sha256(convert_to(pw, 'UTF8')), 'hex') <> 'b80dbbb6f6492a46fc95982d9e8edec4b7fe722e60b661de1a1fcdfe0bdf0ed1' THEN
    RAISE EXCEPTION 'Wrong password';
  END IF;
  IF length(payload::text) > 4000000 THEN
    RAISE EXCEPTION 'Too large';
  END IF;
  INSERT INTO public.site_content (id, data, updated_at) VALUES ('main', payload, now())
  ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now();
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.save_site_content(text, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.save_site_content(text, jsonb) TO anon, authenticated;