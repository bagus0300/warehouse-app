class SkipCSRFVerification
  def initialize(app)
    @app = app
  end

  def call(env)
    env["action_dispatch.request.disable_csrf_protection"] = true
    @app.call(env)
  end
end