namespace 'widgetbeheer-frontend' do
  desc "Create a debian package from the binaries."
  task :build_artifact do |task|

    calver_version = ENV['PIPELINE_VERSION'].nil? ? Time.now.strftime("%Y.%m.%d.%H%M%S") : ENV['PIPELINE_VERSION']
    git_short_ref  = `git rev-parse --short HEAD`.strip
    version        = ENV['ARTIFACT_VERSION'].nil? ? "#{calver_version}+sha.#{git_short_ref}" : ENV['ARTIFACT_VERSION']
    artifact_name  = 'widgetbeheer-frontend'
    vendor         = 'publiq VZW'
    maintainer     = 'Infra publiq <infra@publiq.be>'
    license        = 'Apache-2.0'
    description    = 'Widgetbeheer Frontend'
    source         = 'https://github.com/cultuurnet/widget-beheer-angular'

    FileUtils.mkdir_p('pkg')
    # FileUtils.cp('packages/app/.env.defaults', 'packages/app/.env')

    system("fpm -s dir -t deb -n #{artifact_name} -v #{version} -a all -p pkg \
      -x '.git*' -x pkg -x vendor -x lib -x Rakefile -x Gemfile -x Gemfile.lock \
      -x .bundle -x 'Jenkinsfile.*' \
      --prefix /var/www/widgetbeheer-frontend --deb-no-default-config-files \
      --config-files /var/www/widgetbeheer-frontend/assets/config.json \
      -C dist \
      --deb-user www-data --deb-group www-data \
      --description '#{description}' --url '#{source}' --vendor '#{vendor}' \
      --license '#{license}' -m '#{maintainer}' \
      --deb-field 'Pipeline-Version: #{calver_version}' \
      --deb-field 'Git-Ref: #{git_short_ref}' \
      ."
    ) or exit 1

    # orig command https://jenkins.uitdatabank.be/job/Package_Widgetbeheer_Angular_app/configure
    #
    # system("fpm -t deb -n widgetbeheer-angular-app -v "${PIPELINE_VERSION}+sha.${GIT_COMMIT:0:7}" \
    #   -s dir -a all -p pkg --deb-user www-data --deb-group www-data \
    #   --license "Apache-2.0" -m "Infra publiq <infra@publiq.be>" \
    #   --url "https://www.publiq.be" --vendor "publiq vzw" \
    #   --description "AngularJS frontend for Widget Beheer" \
    #   --prefix /var/www/widgetbeheer -C dist .
    #   ."
    # ) or exit 1
  end
end
