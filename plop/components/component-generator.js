module.exports = (plop) => {

    plop.setGenerator('component', {
        description: 'Componente',
        prompts: [
            {
                name: 'name',
                type: 'input',
                message: 'Nome do Componente: '
            },
            {
                name: 'type',
                type: 'list',
                message: 'Tipo do Componente: ',
                choices: [
                    {
                        name: 'Data Display',
                        value: 'data-display',
                    },
                    {
                        name: 'Feedback',
                        value: 'feedback',
                    },
                    {
                        name: 'Inputs',
                        value: 'inputs',
                    },
                    {
                        name: 'Navigation',
                        value: 'navigation',
                    },
                    {
                        name: 'Surfaces',
                        value: 'surfaces',
                    },
                ]
            }
        ],
        actions(data) {
            const basePath = `src/UI/components/${data.type}/${data.name}`
            const actions = [
                {
                    type: 'add',
                    path: `${basePath}/${data.name}.tsx`,
                    templateFile: 'plop/components/component-template.hbs'
                },
                {
                    type: 'add',
                    path: `${basePath}/${data.name}.styled.tsx`,
                    templateFile: 'plop/components/component-style-template.hbs'
                },
                {
                    type: 'add',
                    path: `${basePath}/${data.name}.stories.tsx`,
                    templateFile: 'plop/components/component-story-template.hbs'
                },
                {
                    type: 'add',
                    path: `${basePath}/${data.name}.test.tsx`,
                    templateFile: 'plop/components/component-test-template.hbs'
                }
            ]

            return actions
        }
    })

}