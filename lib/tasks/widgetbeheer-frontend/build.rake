namespace 'widgetbeheer-frontend' do
  desc "Build binaries"
  task :build do |task|
    system('yarn install') or exit 1
    system('yarn build --configuration=jenkins') or exit 1
  end
end
