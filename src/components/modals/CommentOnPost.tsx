import close from "@/assets/close.svg";

type Prop = {
  publicId: string | undefined;
  toggleModal: (postId?: string) => void;
};

const CommentOnPost = ({ publicId, toggleModal }: Prop) => {
  return (
    <div>
      <button
        onClick={() => toggleModal?.(publicId)}
        className="cursor-pointer ml-auto p-1 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Cancel editing"
      >
        <img src={close} alt="Close" className="w-5 h-5" />
      </button>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit
        exercitationem harum ullam quasi! Illo laboriosam, deleniti dolores
        asperiores rerum perspiciatis corrupti! Nostrum alias recusandae sit at
        delectus magni iusto incidunt, blanditiis veritatis beatae magnam.
        Tenetur iure deleniti facere quae dolore eligendi dignissimos, nam
        voluptate voluptates, eum voluptatem laudantium. Culpa sint odio quae
        in. Aperiam nisi possimus provident mollitia pariatur. Velit modi earum
        sequi vel consequatur, ratione sunt eaque eius quam necessitatibus iure
        iusto molestias, praesentium aliquid incidunt esse suscipit minima,
        possimus aspernatur. Dicta quod debitis corrupti maiores amet voluptatem
        tempore quia architecto nam soluta fuga placeat aspernatur sunt
        excepturi eligendi nobis alias sapiente animi veritatis, minus rerum!
        Quisquam inventore, saepe necessitatibus maxime illum, assumenda quasi
        officiis dolor error minima dolorum quae tempora ad sequi eligendi sed
        voluptatem quod, reiciendis rem mollitia magnam molestiae dolore alias!
        Praesentium molestias rerum autem nostrum possimus. Nisi quisquam ipsum
        unde nemo fugiat adipisci necessitatibus consequuntur, autem architecto
        harum perferendis vel rem, fuga facere nam repudiandae ipsa ratione
        corrupti voluptatibus enim praesentium aliquam cum! Ea, nesciunt nisi
        nemo culpa id adipisci atque, rerum distinctio asperiores neque unde,
        harum odio! Voluptatibus reiciendis laudantium dolorum. A repellat,
        commodi, voluptate eligendi excepturi laboriosam illum praesentium ullam
        ipsum corrupti numquam cumque eum! Aspernatur natus nemo dolor provident
        saepe nisi? Commodi vitae eius molestias omnis. Ab dolores ullam
        distinctio dolorum, molestiae necessitatibus nulla sunt ducimus et?
        Similique assumenda, aut necessitatibus ex quis repellat exercitationem
        sed eaque quae saepe tempora, deserunt a quasi reiciendis magnam
        obcaecati quidem libero natus, voluptas accusamus veritatis sunt!
        Commodi saepe voluptas deleniti. Autem fugiat accusamus enim modi
        architecto quo, rem omnis dolorum. Non nisi nulla voluptatibus fuga
        reiciendis ea, laudantium delectus? Minima repellendus obcaecati
        exercitationem labore est debitis ratione aspernatur quidem et tenetur
        cum suscipit porro, iusto alias, fugiat rem excepturi velit quos,
        expedita earum consequatur odio unde. Eum, labore quae! Fugit iste
        perspiciatis nobis facere expedita itaque, obcaecati quibusdam neque
        temporibus! Corporis porro nobis ipsum reiciendis obcaecati alias saepe
        et odit earum quibusdam, illum labore magnam eligendi ea officia ad
        voluptatum. Deleniti cupiditate corporis repellat saepe, obcaecati quia
        ad ex, nobis eveniet sint iste possimus eaque recusandae. Culpa natus
        officiis soluta ipsa ratione, voluptas modi et aspernatur laudantium
        similique repellendus explicabo repudiandae ut cupiditate nulla atque
        accusamus, qui voluptate cumque quo harum maxime. Minus iure rem quae
        possimus quam exercitationem nobis dolore perferendis, adipisci
        architecto dolorum tempore doloribus aperiam suscipit unde? Perferendis
        assumenda exercitationem accusantium aperiam? Incidunt iste laborum
        magni, maiores error vitae animi sed quisquam commodi doloremque sequi
        corporis. Accusamus architecto laboriosam quasi vitae quod ullam ad
        eveniet consequuntur voluptatibus dolorum soluta vel doloremque
        inventore eius maxime non reprehenderit sapiente ea, odit illo quisquam
        delectus vero, dicta dolorem? Inventore aperiam, deleniti nisi optio
        laboriosam expedita quibusdam reiciendis voluptatem dolores sapiente
        minus. Architecto corporis rem numquam animi debitis laudantium, itaque
        deserunt tenetur minima, ab sit impedit velit. Quod deserunt repellat
        ipsum atque provident quisquam repellendus dolore minima veniam
        voluptatum quae aliquam nihil laboriosam laborum blanditiis, placeat
        vero. Dolor, dolorem aspernatur. Incidunt fuga eaque consectetur placeat
        expedita!
      </p>
    </div>
  );
};

export { CommentOnPost };
