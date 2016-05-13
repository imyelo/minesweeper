build:
	@gulp build

gh-pages: build
  -git branch -D gh-pages
  @git checkout --orphan gh-pages
  @git reset .
  @git clean -f -d -x --exclude build
  # @mv example/* ./
  # @git add . && git commit -m "generate gh-pages"
  # @git push origin gh-pages:gh-pages -f
  # @git checkout master
  # @git branch -D gh-pages

.PHONY: build gh-pages
