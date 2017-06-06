export const IndexComponent = {
  template:`
    <header>
      <div ui-view='header'/>
    </header>
    <main>
      <div ui-view='main'/>
    </main>
    <footer>
      <div ui-view='footer'/>
    </footer>
  `
}
