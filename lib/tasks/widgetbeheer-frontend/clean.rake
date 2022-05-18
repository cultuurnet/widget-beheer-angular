namespace 'widgetbeheer-frontend' do
  desc "Remove generated files."
  task :clean do |task|
    FileUtils.rm_r('pkg', :force => true)
    FileUtils.rm_r('packages/app/.env', :force => true)
    FileUtils.rm_r(Dir.glob('**/node_modules'), :force => true)
  end

  desc "Remove all non-repo files."
  task :clobber => [:clean] do |task|
    FileUtils.rm_r('.bundle', :force => true)
    FileUtils.rm_r('vendor', :force => true)
  end
end
