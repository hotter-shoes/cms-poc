  
  import React , {useEffect} from 'react';

  import { Remarkable } from 'remarkable';

  import '../../css/github-markdown.css';

  const md = new Remarkable();
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)  

  function ArticleSections(props){

    //effect to auto scroll to hash from URL
    useEffect(()=>{
      const match = props.sections.find(section=> section.hash === window.location.hash)
      if(match){
        console.log("scrolling to:" + match.subheader);
        scrollToRef(match.ref)
      }
    },[])



    console.log('article sections');
    const sections = props.sections.map((section,index)=>{
      const markdown = md.render(section.markdown);
      return(
        <section key={index} id={section.hash} ref={section.ref}>
          <h2>{section.subheader}</h2>
          <div className="markdown-body" dangerouslySetInnerHTML={{__html:markdown}}/>
        </section>
      )
    })

    return(<>{sections}</>);
  }

  export default ArticleSections